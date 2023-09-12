import { useInfiniteQuery } from "@tanstack/react-query";
import { getPius } from "../service/getPius";
import { useRef } from "react";

export const useQueryHome = () => {
  const perPage = 10;
  const topRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["piusList"],
      ({ pageParam = 1 }) => getPius(pageParam, perPage),
      {
        refetchInterval: topRef ? 5000 : 20000,
        staleTime: 19000,
        getNextPageParam: (page) => {
          return page.totalPages === page.currentPage
            ? null
            : page.currentPage + 1;
        },
      }
    );
  return { data, isLoading, refetch, fetchNextPage, hasNextPage };
};
