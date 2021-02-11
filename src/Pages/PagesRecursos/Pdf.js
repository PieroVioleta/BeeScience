import React from 'react';
import { useLocation } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function pdf() {
    const id = useLocation().state.id;

    return( 
        <div>
            <CssBaseline/>
            <div style={{position:'absolute', width:'100%', height:'100%'}}>
                <object
                data={require(`../../../server/src/public${id}`)}
                type="application/pdf"
                width="100%"
                height="100%"
                >

                </object>

            </div>
        </div>
        
        
    )
}
