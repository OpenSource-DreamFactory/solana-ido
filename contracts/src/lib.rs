use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;
use anchor_lang::solana_program::program_error::ProgramError;
use std::vec::Vec;

declare_id!("Fg6PaFzntrJ8kCnX8rCQyDjkMA3RqK2HkUMWvPCnRoMd");

#[program]
pub mod project_launchpad {
    use super::*;

    pub fn create_project(ctx: Context<CreateProject>, project_details: ProjectDetails) -> ProgramResult {
        let project_launchpad = &mut ctx.accounts.project_launchpad;
        project_launchpad.projects.push(project_details);
        Ok(())
    }

    pub fn get_project(ctx: Context<GetProject>, project_id: String) -> Result<ProjectDetails, ProgramError> {
        let project_launchpad = &ctx.accounts.project_launchpad;
        project_launchpad.projects.iter().find(|&p| p.project_id == project_id)
            .cloned()
            .ok_or_else(|| ErrorCode::ProjectNotFound.into())
    }

    pub fn update_project(ctx: Context<UpdateProject>, project_id: String, new_project_details: ProjectDetails) -> ProgramResult {
        let project_launchpad = &mut ctx.accounts.project_launchpad;
        if let Some(project) = project_launchpad.projects.iter_mut().find(|p| p.project_id == project_id) {
            *project = new_project_details;
            Ok(())
        } else {
            Err(ErrorCode::ProjectNotFound.into())
        }
    }

    pub fn delete_project(ctx: Context<DeleteProject>, project_id: String) -> ProgramResult {
        let project_launchpad = &mut ctx.accounts.project_launchpad;
        let initial_len = project_launchpad.projects.len();
        project_launchpad.projects.retain(|p| p.project_id != project_id);

        if initial_len > project_launchpad.projects.len() {
            Ok(())
        } else {
            Err(ErrorCode::ProjectNotFound.into())
        }
    }
}

#[derive(Accounts)]
pub struct CreateProject<'info> {
    #[account(init, payer = user, space = 9000)] // Adjusted space calculation
    pub project_launchpad: Account<'info, ProjectLaunchpad>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct GetProject<'info> {
    #[account()]
    pub project_launchpad: Account<'info, ProjectLaunchpad>,
}

#[derive(Accounts)]
pub struct UpdateProject<'info> {
    #[account(mut)]
    pub project_launchpad: Account<'info, ProjectLaunchpad>,
}

#[derive(Accounts)]
pub struct DeleteProject<'info> {
    #[account(mut)]
    pub project_launchpad: Account<'info, ProjectLaunchpad>,
}

#[account]
pub struct ProjectLaunchpad {
    pub projects: Vec<ProjectDetails>,
}

#[derive(Clone, Debug, AnchorSerialize, AnchorDeserialize)]
pub struct ProjectDetails {
    pub project_id: String,
    pub project_name: String,
    pub project_description: String,
    pub start_date: i64, // Using timestamp for simplicity
    pub end_date: i64,
    pub target_fund: u64,
    pub current_fund: u64,
}

#[error_code]
pub enum ErrorCode {
    #[msg("The project was not found.")]
    ProjectNotFound,
}
