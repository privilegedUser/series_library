import { Character } from "src/characters/entities/character.entity";
import { Comment } from "src/comments/entities/comment.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("episodes")
export class Episode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ name: "release_date", type: "datetime" })
    releaseDate: Date;

    @Column({ name: "episode_code" })
    episodeCode: string;

    @ManyToMany(() => Character, (character) => character.episodes)
    @JoinTable()
    characters: Character[];

    @OneToMany(() => Comment, (comment) => comment.episode)
    episodeComments: Comment[];

    @Column({ name: "created_at", type: "datetime", default: "CURRENT_TIMESTAMP" })
    createdAt: Date;
}
