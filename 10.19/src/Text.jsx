import React from 'react';
import { Text } from 'react-native';


const MyText = (props) => {


    return (
        <Text {...props} style={[{   fontSize: 16,  }, { ...props.style }]}>
            {
                props.children
            }
        </Text>
    );
};

export default MyText;
