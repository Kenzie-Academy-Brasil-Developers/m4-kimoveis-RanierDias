import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { ICategoryPublic, ICategoryRegister, TService } from "../../interfaces";
import { categoryDataPublicSchema } from "../../schemas/categories";

const requestCreateCategorie: TService<
  ICategoryPublic,
  ICategoryRegister
> = async (payload) => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);
  const categorie = categoryRepo.create(payload);

  await categoryRepo.save(categorie);

  return categoryDataPublicSchema.parse(categorie);
};

export default requestCreateCategorie;
