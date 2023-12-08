import React from 'react';
import { CircleCheckout } from '@circle-fin/circle-widgets-sdk'
import '@circle-fin/circle-widgets-sdk/lib/dist/base.css';
import '@circle-fin/circle-widgets-sdk/lib/dist/components.css';
import '@circle-fin/circle-widgets-sdk/lib/dist/fonts.css';

const Checkout = ({
    data,
    merchantName
} ) => {
    return (
        <div>
            <CircleCheckout
                sessionId={data?.id}
                environment="sandbox"
                clientKey={data?.clientToken}
                onError={(error) => {
                    console.log("Error: " + error)
                }}
                onPaymentSuccess={(res) => {
                    console.log("Res", res);
                }}
                options={{
                    merchantName: {merchantName},
                }}
            />
        </div>
    );
};

export default Checkout;