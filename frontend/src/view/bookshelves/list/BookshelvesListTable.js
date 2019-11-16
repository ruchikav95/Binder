import { Table, Popconfirm } from 'antd';
import { i18n } from 'i18n';
import actions from 'modules/bookshelves/list/bookshelvesListActions';
import destroyActions from 'modules/bookshelves/destroy/bookshelvesDestroyActions';
import selectors from 'modules/bookshelves/list/bookshelvesListSelectors';
import destroySelectors from 'modules/bookshelves/destroy/bookshelvesDestroySelectors';
import model from 'modules/bookshelves/bookshelvesModel';
import bookshelvesSelectors from 'modules/bookshelves/bookshelvesSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TableWrapper from 'view/shared/styles/TableWrapper';
import ButtonLink from 'view/shared/styles/ButtonLink';
import UserListItem from 'view/iam/list/users/UserListItem';

const { fields } = model;

class BookshelvesListTable extends Component {
  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;

    dispatch(
      actions.doChangePaginationAndSort(pagination, sorter),
    );
  };

  doDestroy = (id) => {
    const { dispatch } = this.props;
    dispatch(destroyActions.doDestroy(id));
  };

  columns = [
    fields.id.forTable(),
    fields.bsBookName.forTable({
      render: (value) => <UserListItem value={value} />,
    }),
    fields.bsSubjec.forTable({
      render: (value) => <UserListItem value={value} />,
    }),
    fields.bsBookOwner.forTable({
      render: (value) => <UserListItem value={value} />,
    }),
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/bookshelves/${record.id}`}>
            {i18n('common.view')}
          </Link>
          {this.props.hasPermissionToEdit && (
            <Link to={`/bookshelves/${record.id}/edit`}>
              {i18n('common.edit')}
            </Link>
          )}
          {this.props.hasPermissionToDestroy && (
            <Popconfirm
              title={i18n('common.areYouSure')}
              onConfirm={() => this.doDestroy(record.id)}
              okText={i18n('common.yes')}
              cancelText={i18n('common.no')}
            >
              <ButtonLink>
                {i18n('common.destroy')}
              </ButtonLink>
            </Popconfirm>
          )}
        </div>
      ),
    },
  ];

  rowSelection = () => {
    return {
      selectedRowKeys: this.props.selectedKeys,
      onChange: (selectedRowKeys) => {
        const { dispatch } = this.props;
        dispatch(actions.doChangeSelected(selectedRowKeys));
      },
    };
  };

  render() {
    const { pagination, rows, loading } = this.props;

    return (
      <TableWrapper>
        <Table
          rowKey="id"
          loading={loading}
          columns={this.columns}
          dataSource={rows}
          pagination={pagination}
          onChange={this.handleTableChange}
          rowSelection={this.rowSelection()}
          scroll={{ x: true }}
        />
      </TableWrapper>
    );
  }
}

function select(state) {
  return {
    loading:
      selectors.selectLoading(state) ||
      destroySelectors.selectLoading(state),
    rows: selectors.selectRows(state),
    pagination: selectors.selectPagination(state),
    filter: selectors.selectFilter(state),
    selectedKeys: selectors.selectSelectedKeys(state),
    hasPermissionToEdit: bookshelvesSelectors.selectPermissionToEdit(
      state,
    ),
    hasPermissionToDestroy: bookshelvesSelectors.selectPermissionToDestroy(
      state,
    ),
  };
}

export default connect(select)(BookshelvesListTable);
