import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Character } from "src/characters/entities/character.entity";

@Entity("locations")
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    longitude: number;

    @Column()
    latitude: number;

    @OneToMany(() => Character, (character) => character.location)
    characters: Character[];

    @Column({ name: "created_at", type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
}
