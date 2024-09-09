import { FC } from "react";

type VaultDetailCard = {
    label: string;
    value: string;
} 

const VaultDetailCard: FC<VaultDetailCard> = ({ label, value }) => {
    return(
        <div className="col-span-12 md:col-span-6 lg:col-span-3 flex flex-col p-8 rounded-2xl bg-gray-900">
            <p className="label text-sm text-gray-600 uppercase font-bold">{label}</p>
            <p className="value text-gray-300 font-bold text-2xl">{value}</p>
          </div>
    );
}

export default VaultDetailCard;