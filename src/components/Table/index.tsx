import React, {
  ReactNode,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import "./index.less";
import { Table, Input, Select, Space, Button, Spin } from "antd";
import request from "@/utils/request";
import { ReloadOutlined, LoadingOutlined } from "@ant-design/icons";

const { Search } = Input;

interface PageTableProps {
  columns: any[];
  tableData?: Object[];
  dataFormatter?: Function;
  headerRightBar?: ReactNode;
  url: string;
}

const PageTable = forwardRef((props: PageTableProps, ref) => {
  const {
    columns = [],
    tableData = [],
    dataFormatter,
    headerRightBar = <></>,
    url,
  } = props;
  const searchColumns = columns.filter((item) => item.sorter);
  const showSearch = searchColumns.length > 0;
  const defaultSearchKey = showSearch ? searchColumns[0]?.dataIndex : "";
  const defaultSearchLabel = showSearch ? searchColumns[0]?.title : "";
  const [loading, setLoading] = useState(false);
  // 列表的数据源
  const [dataList, setDataList] = useState(tableData);
  // 列表显示数据
  const [dataSource, setDataSource] = useState(tableData);
  // 列表查询的字段
  const [searchKey, setSearchKey] = useState(defaultSearchKey);
  // 列表查询的值
  const [searchValue, setSearchValue] = useState("");
  // 列表过滤的字段
  const [filterList, setFilterList] = useState();
  // 列表过滤的值
  // const [filterValueList, setFilterValueList] = useState<string[]>([]);
  // 列表排序字段
  const [sorterKey, setSorterKey] = useState("");
  // 列表排序方式 "ascend" "descend"
  const [sorterValue, setSorterValue] = useState<"ascend" | "descend">();

  useEffect(() => {
    let newDataSource = dataList;
    // 搜索
    if (searchKey && searchValue) {
      newDataSource = newDataSource.filter((item) =>
        item[searchKey]?.includes(searchValue)
      );
    }
    // 过滤
    if (filterList && filterList?.length > 0) {
      newDataSource = newDataSource.filter((item) => {
        let filterFlag = true;
        filterList.forEach((filter) => {
          let { field, filters } = filter;
          if (!filters) {
            filters = [];
          }
          let fieds = item[field];
          fieds = Array.isArray(fieds) ? fieds : [fieds];
          let flag = false;
          filters.forEach((filter) => {
            if (filters && fieds?.includes(filter)) {
              flag = true;
            }
          });
          if (!flag) {
            filterFlag = false;
          }
        });
        console.log("[debug] item:", item, "  filterFlag:", filterFlag);
        return filterFlag;
      });
    }

    // 排序
    if (sorterKey && sorterValue) {
      newDataSource = newDataSource.sort((a, b) => {
        if (sorterValue === "ascend") {
          return a[sorterKey] < b[sorterKey] ? 1 : -1;
        } else {
          return a[sorterKey] > b[sorterKey] ? 1 : -1;
        }
      });
    }
    setDataSource(newDataSource);
    console.log("[debug] newDataSource:", newDataSource);
  }, [searchKey, searchValue, sorterKey, sorterValue, filterList, dataList]);

  const refreshData = () => {
    setLoading(true);
    request
      .get(url)
      .then((res) => {
        let data = res?.data || [];
        if (dataFormatter) {
          data = dataFormatter(data);
        }
        data = data.map((item, index) => {
          item.key = index;
          return item;
        });
        setDataList(data);
      })
      .catch((error) => {
        console.log(`[debug] url:${url} error:${error}.`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    refreshData();
  }, [url]);

  const options = searchColumns.map((item) => {
    const { dataIndex, title } = item;
    return { key: dataIndex, value: dataIndex, label: title };
  });

  useImperativeHandle(ref, () => ({
    refreshData,
  }));

  const onChange = (pagination, filters, sorter, extra) => {
    console.log(
      "[debug] table Change. pagination:",
      pagination,
      "  filters:",
      filters,
      "  sorter:",
      sorter,
      "  extra:",
      extra
    );
    // 排序
    const { field: newSortKey, order: newSortValue } = sorter;
    setSorterKey(newSortKey);
    setSorterValue(newSortValue);
    // 过滤
    const newFilterKeyList = Object.keys(filters)
      .map((key) => {
        return { field: key, filters: filters[key] };
      })
      .filter((item) => item.filters);
    setFilterList(newFilterKeyList);
    // setFilterValueList(filters[newFilterKeyList] || []);
  };

  // 搜索
  const onSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <div className="PageTableContainer">
      <Spin
        indicator={<LoadingOutlined spin />}
        spinning={loading}
        size="large"
      >
        <div className="PageTableHeader">
          <div className="PageTableHeaderLeft">
            {showSearch && (
              <Search
                addonBefore={
                  <Select
                    defaultValue={defaultSearchLabel}
                    options={options}
                    onChange={setSearchKey}
                  />
                }
                placeholder="关键字搜索"
                allowClear
                onSearch={onSearch}
              />
            )}
          </div>
          <div className="PageTableHeaderRight">
            <Space>
              {headerRightBar}
              <Button icon={<ReloadOutlined />} onClick={refreshData}></Button>
            </Space>
          </div>
        </div>
        <Table
          rowSelection={{
            type: "checkbox",
            onChange: () => {},
          }}
          columns={columns}
          dataSource={dataSource}
          onChange={onChange}
        />
      </Spin>
    </div>
  );
});

export default PageTable;
