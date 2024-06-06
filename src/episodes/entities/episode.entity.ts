import { Character } from "src/characters/entities/character.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Unique(["episodeCode"])
@Entity("episodes")
export class Episode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ name: "release_date", type: "timestamptz" })
    releaseDate: Date;

    @Column({ name: "episode_code" })
    episodeCode: string;

    @ManyToMany(() => Character, (character) => character.episodes)
    characters: Character[];

    @OneToMany(() => Comment, (comment) => comment.episode)
    episodeComments: Comment[];

    @Column({ name: "created_at", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ name: "comment_count", nullable: true })
    commentCount?: number;
}
