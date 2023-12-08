// @ts-nocheck

import React from 'react';
import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react';
import Enrolleduniv from '../../components/Enrolleduniv';

const theme = extendTheme({
  // Add your custom theme configuration here if needed
});

function Comapany() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <h2 className='text-center text-lg text-green-400'>Select the Enrolled Company</h2>
      <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }} className="gap-8">
      
        
      <Enrolleduniv
          name="Polygon"
          location="Remote"
          employees={2300}
          url="polygon"
          imageUrl="https://images.indianexpress.com/2021/10/CVJ.CH-Polygon-Network-1-1.png"
          avatarUrl="https://s3.coinmarketcap.com/static-gravity/image/b8db9a2ac5004c1685a39728cdf4e100.png"
      />

        <Enrolleduniv
            name="Ethereum Fellowship"
            location="Remote"
            employees={230}
            url="ethereumfellowship"
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXophuLB6e8JIZVWf3-aYxdK3VtXugIdcIa4qfKtC3r_8-ND8MdPAF-k1iQT5ETK_tNu0&usqp=CAU"
            avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbGL3Mio4BlgfkwNDqTaHvlP4DPPx5-Gsaegd_TBQx8flG-YfampMqszJ70OgksEmpPjs&usqp=CAU"
        />

        <Enrolleduniv
            name="Arbitrum"
            location="Remote"
            employees={14000}
            url="arbitrium"
            imageUrl="https://media.zenfs.com/en/coin_rivet_596/f1066cf326b77e842b0c1ee19006bf4a"
            avatarUrl="https://s2.coinmarketcap.com/static/img/coins/200x200/11841.png"
        />

        <Enrolleduniv
            name="zkSync"
            location="Remote"
            employees={1000}
            url="zksync"
            imageUrl="https://miro.medium.com/v2/resize:fit:971/1*w_5npXegHQq5zql15ol3bQ.png"
            avatarUrl="https://lite.zksync.io/images/logo-no-letters.svg"
        />

      </div>
    </ChakraProvider>
  );
}

export default Comapany;
