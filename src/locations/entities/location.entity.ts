import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Character } from "src/characters/entities/character.entity";

@Unique(["longitude", "latitude"])
@Entity("locations")
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    longitude: string;

    @Column()
    latitude: string;

    @OneToMany(() => Character, (character) => character.location)
    characters: Character[];

    @Column({ name: "created_at", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
}
