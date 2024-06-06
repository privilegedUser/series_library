import { Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("character_episode")
export class CharacterEpisode {
    @PrimaryGeneratedColumn()
    id: number;

    @PrimaryColumn({ name: "character_id" })
    characterId: number;

    @PrimaryColumn({ name: "episode_id" })
    episodeId: number;
}