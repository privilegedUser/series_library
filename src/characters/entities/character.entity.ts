import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "src/locations/entities/location.entity";
import { Episode } from "src/episodes/entities/episode.entity";
import { Gender } from "../models/gender";
import { Status } from "../models/status";

@Entity("characters")
export class Character {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "first_name" })
    firstName: string;

    @Column({ name: "last_name" })
    lastName: string;

    @Column({ enum: Status })
    status: Status;

    @Column({ name: "state_of_origin", nullable: true })
    stateOfOrigin?: string;

    @Column({ enum: Gender })
    gender: Gender;

    @Column({ name: "location_id", nullable: true })
    locationId?: number;

    @ManyToOne(() => Location, (location) => location.characters)
    @JoinColumn({ name: "location_id" })
    location?: Location;

    @ManyToMany(() => Episode, (episode) => episode.characters)
    @JoinTable({
        name: "character_episode",
        joinColumn: {
            name: "character_id",
            referencedColumnName: "id",
            foreignKeyConstraintName: "character_episode_character_id"
        },
        inverseJoinColumn: {
            name: "episode_id",
            referencedColumnName: "id",
            foreignKeyConstraintName: "character_episode_episode_id"
        }
    })
    episodes: Episode[];

    @Column({ name: "created_at", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
}
