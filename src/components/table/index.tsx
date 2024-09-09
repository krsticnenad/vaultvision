import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Progress
} from "@nextui-org/react";
import { RootState, useAppSelector } from "../../store";
import { FC, memo } from "react";
import { bytesToString } from "@defisaver/tokens/esm/utils";
import { convertWeiToEther } from "../../utils/functions/convert-wei-to-eth";
import { formatThousands } from "../../utils/functions/format-thousands";
import TableEmptyState from "../table/empty-state";
import SearchHistory from "../search/history";
import { CryptoIcon } from "../crypto-icon/set-icon";
import { useNavigate } from "react-router-dom";

export const VaultTable: FC<any> = ({loader, progress}) => {
const cdps = useAppSelector((state: RootState) => state.cdp);
const navigate = useNavigate();

const handleDetails = (id: number) => {
    navigate(`cdp/${id}`);
}

    return (
        <div className="col-span-12 md:col-span-9 content-center">
          {
            loader ? (
                <Progress label="Searching..." showValueLabel className="max-w-lg mx-auto" aria-label="Progress" value={progress} />
            ) : (
              <>
                <Table
                    isStriped aria-label="CDP Collection table"
                    className="w-full md:min-h-full min-h-fit"
                >
                  <TableHeader>
                  <TableColumn>ID</TableColumn>
                    <TableColumn>Collateral</TableColumn>
                    <TableColumn>Debt</TableColumn>
                    <TableColumn>Type</TableColumn>
                    <TableColumn>Action</TableColumn>
                  </TableHeader>
                  <TableBody emptyContent={<TableEmptyState notFound={cdps.notFound} />}>
                    {cdps.data?.map((cdp, index) => (
                      <TableRow key={index.toString()}>
                        <TableCell>{cdp.id || "N/A"}</TableCell>
                        <TableCell>
                          {
                              `${formatThousands(convertWeiToEther(cdp.collateral)) || "N/A"} 
                                ${bytesToString(cdp.ilk) || "N/A"}`
                          }
                        </TableCell>
                        <TableCell>
                          {`${formatThousands(convertWeiToEther(cdp.debt)) || "N/A"} DAI`}
                        </TableCell>
                        <TableCell>{CryptoIcon(bytesToString(cdp.ilk))}</TableCell>
                        <TableCell className="cursor-pointer" onClick={() => handleDetails(cdp.id)}>Details</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="block md:hidden">
                  <SearchHistory />
                </div>
              </>
            )
          }
        </div>
    );
}

export default memo(VaultTable);