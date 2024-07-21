import React, { useEffect } from 'react';
import jsMind from 'jsmind';

const Linkage: React.FC = () => {
    useEffect(() => {
        var mind = {
            "meta": {
                "name": "example",
                "author": "hizzgdev",
                "version": "0.2"
            },
            "format": "node_tree",
            "data": {
                "id": "root",
                "topic": "jsMind",
                "children": [
                    { "id": "sub1", "topic": "sub1" },
                    { "id": "sub2", "topic": "sub2" }
                ]
            }
        };
        var options = {
            container: 'jsmind_container',
            theme: 'primary',
            editable: true,
        };
        var jm = new jsMind(options);
        jm.show(mind);
    }, []);

    return (
        <div id="jsmind_container" className='w-200 h-125'></div>
    )
}

export default Linkage;
