import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateExperiences1719394829424 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table ({
            name: "experiences",
            columns: [
              {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              {
                name: "user_id",
                type: "int",
              },
              {
                name: "software_education",
                type: "varchar",
                length: "50",
              },
              {
                name: "dev_language",
                type: "varchar",
                length: "50",
              },
              {
                name: "dev_position",
                type: "varchar",
                length: "50",
              },
              {
                name: "work_experience", //años de experiencia
                type: "varchar",
                length: "50",
              },
            ],
            foreignKeys: [
              {
                columnNames: ["user_id"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
              },
            ],
          }),
          true
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("experience");
      }
    }
    