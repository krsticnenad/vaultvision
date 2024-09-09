import '../App.css';
import { FC, SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CdpData } from '../interfaces/cdp-data';
import { fetchCdpById } from '../utils/functions/fetch-cdp-data';
import { DefaultLayout } from '../layout/default-layout';
import { serializeData } from '../utils/functions/serialize-data';
import { convertWeiToEther } from '../utils/functions/convert-wei-to-eth';
import { formatThousands } from '../utils/functions/format-thousands';
import { Button, Spinner } from '@nextui-org/react';
import { CryptoIcon } from '../components/crypto-icon/set-icon';
import { bytesToString } from '@defisaver/tokens/esm/utils';
import VaultDetailCard from '../components/vault-detail-card';
import { calculateMaxWithdrawLiquidation } from '../utils/functions/calculate-max-debt-without-liquidation';
import { calculateMaxWithdrawCollateral } from '../utils/functions/calculate-max-withdraw-collateral';
import web3, { metaMaskAccount } from '../utils/web3';

const VaultPage: FC<any> = () => {

  const { id } = useParams();
  const [ data, setData ] = useState<CdpData | any>(null);
  const [signature, setSignature] = useState<string | null>(null);

  useEffect(() => {
    if ( !id ) return;

      setTimeout(() => {
        fetchCdpById(Number(id)).then(resp => {
          setData(serializeData(resp))
        });
      }, 1200);
      
      
  }, [ id ]);

  const handleSignMessage = async () => {
    if (!web3 || !metaMaskAccount) return;

    try {
      const message = `Ovo je moj CDP: ${id}`;
      const signature = await web3.eth.personal.sign(message, metaMaskAccount, '');
      setSignature(signature);
    } catch (error: any) {
      console.error('Greška prilikom potpisivanja poruke:', error);
    }
  }

  if (!data) return <div className='min-w-full h-screen flex content-center justify-center'><Spinner /></div>;

  const { debt, ilk, collateral } = data;
  const type = bytesToString(ilk);
  const maxWithdraw = calculateMaxWithdrawCollateral(type, convertWeiToEther(collateral), convertWeiToEther(debt));
  const liquidation = calculateMaxWithdrawLiquidation(type, convertWeiToEther(collateral));

  return (
    <DefaultLayout>
      <div className='container sm:my-32 my-12 mx-auto px-4'>
        <div  className='flex justify-between content-center'>
          <div className='flex align-middle content-center'>
            {CryptoIcon(type, 'large')} <h1 className='text-3xl ml-4 flex items-center'>{type} VAULT {id}</h1>
          </div>
          {metaMaskAccount ? <Button color='primary' onClick={handleSignMessage}>Sign the Vault</Button> : null}
        </div>

        <div className='w-full border border-gray-900 rounded-2xl mt-12 p-8'>
          <h3 className='uppercase text-gray-800 font-bold mb-8'>Overview</h3>

          <div className='grid grid-cols-12 gap-2'>
            <VaultDetailCard label={'Collateral'} value={`${formatThousands(convertWeiToEther(collateral))} ${type}`} />
            <VaultDetailCard label={'Debt'} value={`${formatThousands(convertWeiToEther(debt))} DAI`} />
            <VaultDetailCard label={'Max Withdraw Collateral'} value={`${formatThousands(Number(maxWithdraw))} ${type}`} />
            <VaultDetailCard label={'Debt Without Liquidation'} value={`${formatThousands(Number(liquidation))} DAI`} />
          </div>
          {signature && <p className='text-sm text-gray-500 mt-12'>Signature: <span className='font-bold'>{signature}</span></p>}
        </div>
      </div>
    </DefaultLayout>
  )
}

export default VaultPage;
