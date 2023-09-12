import { backendRoutes, routes } from "../routes";
import { Paginated } from "../types/Paginated";
import { Piu } from "../types/Pius";
import { apiPiu } from "./api";

export const getPius = (
  currentPage: number,
  perPage: number
): Promise<Paginated<Piu>> => {
  return apiPiu
    .get(backendRoutes.pius, {
      params: { page: currentPage, per_page: perPage },
    })
    .then((newResponse) => {
      const newData = newResponse.data || [];
      return newData;
    });
};
