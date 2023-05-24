import {IComment} from "./entity/comment";
import {IUser} from "./entity/user";

export interface CommentDto {
  comment: IComment,
  user: IUser
}
