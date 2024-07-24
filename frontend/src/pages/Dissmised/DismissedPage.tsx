import Table, {createTableColumns} from "../../components/Table/Table";
import Loader from "../../components/Shared/Loader";
import { useState, useEffect } from "react";
import useHttp from "../../hooks/useHttp";

const DismissedPage: React.FC = () => {
    const [tableData,setTableData] = useState([])
    const [isLoading,error,submitData] = useHttp()

    useEffect(() => {
        submitData({
            url:"http://localhost:3000/left"
        },
        (response) => setTableData(response)
    )
    }, [])

    console.log(tableData)
    const columns = [
        createTableColumns({
             title: "Name",
             key: "name",
             dataIndex: "name",
        })
        
    ]


    return (
        <section>
           {!isLoading ? <Table data={tableData} columns={columns}/> : <Loader/>}
        </section>
    );
}

export default DismissedPage;