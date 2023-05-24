import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IRecipe} from "../../shared/interface/recipe";
import {CommentRepository} from "../../shared/repository/comment.repository";

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.sass']
})
export class RecipeCardComponent implements OnInit, OnChanges {
  @Input() recipes: IRecipe[] | null;
  @Input() count?: number;
  @Input() create?: boolean = false;

  ngOnInit(): void {
    this.count = this.count || this.recipes?.length
  }

  constructor(private commentRepository: CommentRepository) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.recipes?.forEach(t => {
      this.commentRepository.getByRecipeId(t.id).subscribe(r => {
        t.commentCount = r.length
      })
    })
  }

}
