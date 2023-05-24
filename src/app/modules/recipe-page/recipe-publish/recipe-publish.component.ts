import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {RecipeRepository} from "../../../shared/repository/recipe.repository";
import {IRecipe} from "../../../shared/interface/recipe";
import {IComment, ICommentWithoutId} from "../../../shared/interface/entity/comment";
import {CommentRepository} from "../../../shared/repository/comment.repository";
import {CommentDto} from "../../../shared/interface/comment.dto";
import {UserRepository} from "../../../shared/repository/user.repository";
import {IUser} from "../../../shared/interface/entity/user";
import {AuthService} from "../../../shared/service/auth.service";
import {combineLatest, map, of, switchMap} from "rxjs";

@Component({
  selector: 'app-recipe-publish',
  templateUrl: './recipe-publish.component.html',
  styleUrls: ['./recipe-publish.component.sass']
})
export class RecipePublishComponent implements OnInit {

  author: IUser | undefined

  formComment = new FormGroup({
    comment: new FormControl(null, Validators.required)
  });

  get comment() {
    return this.formComment.controls.comment;
  }

  id: string;

  constructor(private activateRoute: ActivatedRoute, private recipeService: RecipeRepository, private commentRepository: CommentRepository, private userRepository: UserRepository, private authService: AuthService) {
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.recipeService.getByIds([this.id])
      .pipe(
        switchMap((value) => {
          this.recipe = value[0];
          return this.userRepository.getById(this.recipe.userId);
        }),
        switchMap((user) => {
          this.author = user;
          if (this.recipe!.productIds.length !== 0) {
            return this.recipeService.getByIds(this.recipe!.productIds);
          } else {
            return of([]);
          }
        }),
        switchMap((products) => {
          this.products = products;
          return this.commentRepository.getByRecipeId(this.recipe!.id);
        }),
        switchMap((comments) => {
          const userObservables = comments.map((comment) =>
            this.userRepository.getById(comment.userId).pipe(
              map((user) => ({
                comment,
                user
              }))
            )
          );
          return combineLatest(userObservables);
        })
      )
      .subscribe((commentUserPairs) => {
        commentUserPairs.forEach((pair) => {
          const newCommentDto: CommentDto = {
            comment: pair.comment,
            user: pair.user
          };

          if (this.comments.filter((f) => f.comment.id === newCommentDto.comment.id).length === 0) {
            this.comments.push(newCommentDto);
            this.comments = this.comments.sort(function (o1, o2) {
              return o1.comment.date < o2.comment.date ? -1 : o1.comment.date > o2.comment.date ? 1 : 0;
            });
          }
        });
      });

    this.authService.getCurrentUser().subscribe((user) => (this.currentUser = user));
  }

  currentUser: IUser | undefined
  comments: CommentDto[] = [];
  recipe: IRecipe | undefined
  products: IRecipe[] = []

  addComment() {
    const comment: ICommentWithoutId = {
      recipeId: this.recipe!.id,
      userId: this.currentUser!.id,
      date: new Date(),
      text: this.comment.value!
    }
    this.commentRepository.create(comment).subscribe((docRef) => {
      const newComment: IComment = {id: docRef.id, ...comment}
      const commentDto: CommentDto = {
        comment: newComment,
        user: this.currentUser!
      }
      this.comments.push(commentDto)
      this.formComment.reset()
    })
  }
}
