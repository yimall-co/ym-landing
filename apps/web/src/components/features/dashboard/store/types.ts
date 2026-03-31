import { WorkspaceData } from 'lib/workspace-data';

export type DashboardState = {
    selectedWorkspace: WorkspaceData | null;
}

export type DashboardActions = {
    setSelectedWorkspace: (workspace: WorkspaceData | null) => void;
}

export type DashboardStore = DashboardState & DashboardActions;
