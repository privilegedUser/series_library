import { Episode } from "src/episodes/entities/episode.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Unique(["comment", "episodeId", "ipAddressLocation"])
@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 250 })
    comment: string;

    @Column({ name: "ip_address_location "})
    ipAddressLocation: string;

    @Column({ name: "episode_id" })
    episodeId: number;

    @ManyToOne(() => Episode, (episode) => episode.episodeComments)
    @JoinColumn({ name: "episode_id" })
    episode: Episode;

    @Column({ name: "created_at", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
}
