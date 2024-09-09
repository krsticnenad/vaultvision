import { Input, Select, SelectItem } from "@nextui-org/react";
import { FC, memo } from "react";
import { COLLATERAL_TYPES } from "../../constants/collaterals";
import SearchHistory from "./history";

interface SearchOptionsProps {
    searchTerm: number | any;
    collateralType: string | null;
    onTermSearchChange: (value: number | any) => void;
    onCollateralTypeChange: (value: number | any) => void;
}

const SearchOptions: FC<SearchOptionsProps> = ({
    searchTerm,
    collateralType,
    onTermSearchChange,
    onCollateralTypeChange
}) => {

    const handleChangeCollateralType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCollateralType = COLLATERAL_TYPES.find(collateral => collateral.key === Number(e.target.value));
        onCollateralTypeChange(selectedCollateralType?.value ?? null);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowed = [ 'ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'Backspace', 'Tab', 'Delete' ];
        if ( allowed.includes(e.key) || /[0-9]/.test(e.key) ) return;
        e.preventDefault();
    }
    
    return (
        <div className="col-span-12 md:col-span-3">
            <Select 
                label="Collateral type"
                className="w-full mb-2"
                value={collateralType ?? ''}
                onChange={handleChangeCollateralType}
                >
                {COLLATERAL_TYPES.map((collateral) => (
                    <SelectItem key={collateral.key} value={collateral.value}>
                        {collateral.value}
                    </SelectItem>
                ))}
            </Select>
            <Input
                type="text"
                value={searchTerm ?? ''}
                onChange={e => onTermSearchChange(e.target.value ?? null)}
                onKeyDown={handleKeyDown}
                label="CDP Identifier"
                className="w-full mb-2"
            />
            <div className="hidden md:block"><SearchHistory /></div>
        </div>
    )
}

export default memo(SearchOptions);