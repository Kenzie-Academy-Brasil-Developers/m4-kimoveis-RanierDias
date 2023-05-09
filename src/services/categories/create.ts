import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { ICategoryPublic, ICategoryRegister, TService } from "../../interfaces";
import { categoryDataPublicSchema } from "../../schemas/categories";

const requestCreateCategorie: TService<ICategoryPublic> = async (
  payload: ICategoryRegister
) => {
  const categoryRepo = AppDataSource.getRepository(Category);
  const categorie = categoryRepo.create(payload);

  await categoryRepo.save(categorie);

  return categoryDataPublicSchema.parse(categorie);
};

export default requestCreateCategorie;
