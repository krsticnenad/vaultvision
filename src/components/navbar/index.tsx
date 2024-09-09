import vaultVisionLogo from '../../assets/vault-vision-logo.svg';
import {Navbar, NavbarBrand, NavbarContent, Link} from "@nextui-org/react";
import { metaMaskAccount } from '../../utils/web3';


export const ThemedNavbar = () => {
    return(
      <Navbar maxWidth='full' shouldHideOnScroll className='bg-transparent'>
        <NavbarBrand>
          <img src={vaultVisionLogo} className="logo" alt="React logo" />
        </NavbarBrand>
        {!metaMaskAccount ? (
          <NavbarContent data-justify="end">
            <Link target='_blank' href={'https://metamask.io/download/'}>Try with MetaMask</Link>
          </NavbarContent>
        ) : null}
      </Navbar>
    )
}