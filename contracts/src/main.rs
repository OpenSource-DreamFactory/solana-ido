## main.rs
use anchor_lang::prelude::*;
use crate::project_launchpad::ProjectLaunchpad;

declare_id!("Fg6PaFzntrJ8kCnXw2hEYzAyGCtE8C2saNEGX4SXvySj");

#[program]
pub mod launchpad_project {
    use super::*;

    pub fn create_project(ctx: Context<CreateProject>, project_details: ProjectDetails) -> Result<()> {
        let project_launchpad: &mut Account<ProjectLaunchpad> = &mut ctx.accounts.project_launchpad;
        project_launchpad.validate_project_details(&project_details)?;
        project_launchpad.create_project(project_details)
    }

    pub fn get_project(ctx: Context<GetProject>, project_id: String) -> Result<ProjectDetails> {
        let project_launchpad: &Account<ProjectLaunchpad> = &ctx.accounts.project_launchpad;
        project_launchpad.get_project(project_id)
    }

    pub fn update_project(ctx: Context<UpdateProject>, project_id: String, project_details: ProjectDetails) -> Result<()> {
        let project_launchpad: &mut Account<ProjectLaunchpad> = &mut ctx.accounts.project_launchpad;
        project_launchpad.validate_project_details(&project_details)?;
        project_launchpad.update_project(project_id, project_details)
    }

    pub fn delete_project(ctx: Context<DeleteProject>, project_id: String) -> Result<()> {
        let project_launchpad: &mut Account<ProjectLaunchpad> = &mut ctx.accounts.project_launchpad;
        project_launchpad.delete_project(project_id)
    }
}

#[derive(Accounts)]
pub struct CreateProject<'info> {
    #[account(mut)]
    pub project_launchpad: Account<'info, ProjectLaunchpad>,
}

#[derive(Accounts)]
pub struct GetProject<'info> {
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

impl ProjectLaunchpad {
    fn validate_project_details(&self, details: &ProjectDetails) -> Result<()> {
        if details.project_name.trim().is_empty() || details.project_description.trim().is_empty() {
            return Err(ErrorCode::InvalidInput.into());
        }
        if details.start_date <= 0 || details.end_date <= 0 || details.end_date <= details.start_date {
            return Err(ErrorCode::InvalidInput.into());
        }
        if details.target_fund <= 0 {
            return Err(ErrorCode::InvalidInput.into());
        }
        // Ensure project_id uniqueness
        if self.projects.contains_key(&details.project_id) {
            return Err(ErrorCode::ProjectAlreadyExists.into());
        }
        Ok(())
    }
}

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid input provided")]
    InvalidInput,
    #[msg("Project not found")]
    ProjectNotFound,
    #[msg("Project already exists")]
    ProjectAlreadyExists,
}
