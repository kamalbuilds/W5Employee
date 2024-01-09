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
          companydid="did:ion:EiAWZrqejZkWXKpKG1XoiXc-kH5zENr8uZlPM7OaXYZSpQ:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiOEtLNEpxWXJLWEoyeDRkMUZCT0RKVmdVNDJwRzZobVRRbWduRVAtTXpwNCJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJwV0w1VDZDTmFCNnF1T2NPMVpLZldvdHpJZTByWWJxOHRveTlwaUFzMXdnIiwieSI6ImxRaDBYUzl6Tm5yZHhuMjFha25oTG1TQzNCS0phLVhKM3g2WFlOb1djT0kifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMSIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMiJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlEel83dndNUGExUEhsNmRvbWU5ZGk4OUZTc0Y2M2YtalVUOHdrVDkyQ1M3dyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpQkk5Rm1KQndXT0RjbklrSmxCU0ZqQW9zTmV6c0NtVnU0QUdGUUJSbkxSdUEiLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUE2SDJvS2RTZFVKM2h5OG5tSnZjWHozR3BmUmxkd1RJdlNVZnRnakJFbzVnIn19"
          url="polygon"
          imageUrl="https://images.indianexpress.com/2021/10/CVJ.CH-Polygon-Network-1-1.png"
          avatarUrl="https://s3.coinmarketcap.com/static-gravity/image/b8db9a2ac5004c1685a39728cdf4e100.png"
      />

        <Enrolleduniv
            name="Ethereum Fellowship"
            location="Remote"
            employees={230}
            companydid="did:ion:E453w23"
            url="ethereumfellowship"
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXophuLB6e8JIZVWf3-aYxdK3VtXugIdcIa4qfKtC3r_8-ND8MdPAF-k1iQT5ETK_tNu0&usqp=CAU"
            avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbGL3Mio4BlgfkwNDqTaHvlP4DPPx5-Gsaegd_TBQx8flG-YfampMqszJ70OgksEmpPjs&usqp=CAU"
        />

        <Enrolleduniv
            name="Arbitrum"
            location="Remote"
            employees={14000}
            companydid="did:ion:E453w23"
            url="arbitrium"
            imageUrl="https://media.zenfs.com/en/coin_rivet_596/f1066cf326b77e842b0c1ee19006bf4a"
            avatarUrl="https://s2.coinmarketcap.com/static/img/coins/200x200/11841.png"
        />

        <Enrolleduniv
            name="zkSync"
            location="Remote"
            employees={1000}
            companydid="did:ion:E453w23"
            url="zksync"
            imageUrl="https://miro.medium.com/v2/resize:fit:971/1*w_5npXegHQq5zql15ol3bQ.png"
            avatarUrl="https://lite.zksync.io/images/logo-no-letters.svg"
        />

      </div>
    </ChakraProvider>
  );
}

export default Comapany;
