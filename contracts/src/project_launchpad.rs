use anchor_lang::prelude::*;
use std::collections::HashMap;

declare_id!("Fg6PaF8kL1NKRadRZt4MTvbCrqeeD81KaGqrCFmzCRq");

#[program]
pub mod project_launchpad {
    use super::*;
    use anchor_lang::solana_program::log;

    pub fn create_project(ctx: Context<CreateProject>, project_details: ProjectDetails) -> Result<()> {
        let project_launchpad = &mut ctx.accounts.project_launchpad;
        if project_launchpad.projects.contains_key(&project_details.project_id) {
            return Err(error!(ErrorCode::ProjectAlreadyExists));
        }
        project_launchpad.projects.insert(project_details.project_id.clone(), project_details);
        log::sol_log("Project created");
        Ok(())
    }

    pub fn get_project(ctx: Context<GetProject>, project_id: String) -> Result<ProjectDetails> {
        let project_launchpad = &ctx.accounts.project_launchpad;
        match project_launchpad.projects.get(&project_id) {
            Some(project_details) => Ok(project_details.clone()),
            None => Err(error!(ErrorCode::ProjectNotFound)),
        }
    }

    pub fn update_project(ctx: Context<UpdateProject>, project_id: String, project_details: ProjectDetails) -> Result<()> {
        let project_launchpad = &mut ctx.accounts.project_launchpad;
        if !project_launchpad.projects.contains_key(&project_id) {
            return Err(error!(ErrorCode::ProjectNotFound));
        }
        project_launchpad.projects.insert(project_id, project_details);
        log::sol_log("Project updated");
        Ok(())
    }

    pub fn delete_project(ctx: Context<DeleteProject>, project_id: String) -> Result<()> {
        let project_launchpad = &mut ctx.accounts.project_launchpad;
        if project_launchpad.projects.remove(&project_id).is_none() {
            return Err(error!(ErrorCode::ProjectNotFound));
        }
        log::sol_log("Project deleted");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateProject<'info> {
    #[account(init, payer = user, space = 9000)]
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
    pub projects: HashMap<String, ProjectDetails>,
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct ProjectDetails {
    pub project_id: String,
    pub project_name: String,
    pub project_description: String,
    pub start_date: i64, // Unix Timestamp
    pub end_date: i64, // Unix Timestamp
    pub target_fund: u64,
    pub current_fund: u64,
}

#[error_code]
pub enum ErrorCode {
    #[msg("The project could not be found.")]
    ProjectNotFound,
    #[msg("The project already exists.")]
    ProjectAlreadyExists,
}
