import { AuthState } from "./slices/authSlice";
import { CamsState } from "./slices/camsSlice";
import { GroupsState } from "./slices/groupsSlice";
import { MosaicsState } from "./slices/mosaicsSlice";
import { UsersState } from "./slices/userSlice";

export type RootState = {
  auth: AuthState;
  users: UsersState;
  cams: CamsState;
  groups: GroupsState;
  mosaics: MosaicsState;
};
