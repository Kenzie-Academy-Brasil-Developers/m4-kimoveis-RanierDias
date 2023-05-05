import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from "typeorm";
import User from "./user";
import RealEstate from "./estate";

@Entity("schedules")
class Schedule {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  time: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => RealEstate)
  realEstate: RealEstate;
}

export default Schedule;
