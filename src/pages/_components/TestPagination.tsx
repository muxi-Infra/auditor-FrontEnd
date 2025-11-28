import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination";
import { useState } from "react";
import { getProjectItemsByPagination } from "@/apis";
import useItemStore from "@/stores/items";
interface TestPaginationProps {
  project_id: number;
  currentPage?: number;
  totalPage?: number;
}

export function TestPagination({
  project_id,
  currentPage = 1,
  totalPage = 100,
}: TestPaginationProps) {
  const [curPage, setCurPage] = useState<number>(currentPage);
 const {setItems, setOriginalItems } = useItemStore();
  const handlePagination = (page: number) => {
    
    getProjectItemsByPagination(project_id,page,10).then(
      (res)=>{
          console.log(curPage)
           setItems(res);
           
           setOriginalItems(res);
           setCurPage(page)
          
      }
    ).catch(
      (e)=>{
        console.log(e);
      }
    )

  };

  const handleNext = () => {
    if (curPage < totalPage) handlePagination(curPage + 1);
  };
  const handlePrevious = () => {
    if (curPage > 1) handlePagination(curPage - 1);
  };

  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);
  const displayPages1 = pages.filter((p) => p >= curPage - 2 && p <= curPage + 2);
  const displayPages2 = pages.filter((p) => p >= totalPage - 4 && p <= totalPage);

  // ----------------------------------------------------
  // 情况 1: totalPage <= 10
  // ----------------------------------------------------
  if (totalPage <= 10) {
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem onClick={handlePrevious} className="cursor-pointer">
            <PaginationPrevious />
          </PaginationItem>

          {Array.from({ length: totalPage }).map((_, index) => (
            <PaginationItem key={index} className="cursor-pointer">
              <PaginationLink
                onClick={() => handlePagination(index + 1)}
                isActive={curPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem onClick={handleNext} className="cursor-pointer">
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }

  // ----------------------------------------------------
  // 情况 2: curPage < 5
  // ----------------------------------------------------
  if (curPage < 5) {
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem onClick={handlePrevious} className="cursor-pointer">
            <PaginationPrevious />
          </PaginationItem>

          {pages.slice(0, 5).map((p) => (
            <PaginationItem key={p} className="cursor-pointer">
              <PaginationLink
                onClick={() => handlePagination(p)}
                isActive={curPage === p}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem className="cursor-pointer">
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem
            onClick={() => handlePagination(totalPage)}
            className="cursor-pointer"
          >
            <PaginationLink>{totalPage}</PaginationLink>
          </PaginationItem>

          <PaginationItem onClick={handleNext} className="cursor-pointer">
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }

  // ----------------------------------------------------
  // 情况 3: 中间段
  // ----------------------------------------------------
  if (curPage >= 5 && curPage <= totalPage - 4) {
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem onClick={handlePrevious} className="cursor-pointer">
            <PaginationPrevious />
          </PaginationItem>

          <PaginationItem
            onClick={() => handlePagination(1)}
            className="cursor-pointer"
          >
            <PaginationLink>1</PaginationLink>
          </PaginationItem>

          <PaginationItem className="cursor-pointer">
            <PaginationEllipsis />
          </PaginationItem>

          {displayPages1.map((p) => (
            <PaginationItem key={p} className="cursor-pointer">
              <PaginationLink
                onClick={() => handlePagination(p)}
                isActive={curPage === p}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem className="cursor-pointer">
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem
            onClick={() => handlePagination(totalPage)}
            className="cursor-pointer"
          >
            <PaginationLink>{totalPage}</PaginationLink>
          </PaginationItem>

          <PaginationItem onClick={handleNext} className="cursor-pointer">
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }

  // ----------------------------------------------------
  // 情况 4: 接近尾部
  // ----------------------------------------------------
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem onClick={handlePrevious} className="cursor-pointer">
          <PaginationPrevious />
        </PaginationItem>

        <PaginationItem
          onClick={() => handlePagination(1)}
          className="cursor-pointer"
        >
          <PaginationLink>1</PaginationLink>
        </PaginationItem>

        <PaginationItem className="cursor-pointer">
          <PaginationEllipsis />
        </PaginationItem>

        {displayPages2.map((p) => (
          <PaginationItem key={p} className="cursor-pointer">
            <PaginationLink
              onClick={() => handlePagination(p)}
              isActive={curPage === p}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem onClick={handleNext} className="cursor-pointer">
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
