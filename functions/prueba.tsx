import { Checkbox, Divider } from 'antd';
import React, {useEffect} from 'react'

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];

export default function Prueba () {
    const [checkedList, setCheckedList] = React.useState([]);


    const onChange = (list: any) => {
        setCheckedList(list);

    };

useEffect(() => {
    console.log(checkedList, checkedList.length )
}, [onChange])

    return (
        <>
            
            <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />
        </>
    );
};
