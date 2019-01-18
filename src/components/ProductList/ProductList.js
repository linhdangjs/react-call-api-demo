import React, { Component } from 'react';
class ProductList extends Component {
    render() {
        return (
            <div className="card text-white bg-dark">
                <div className="card-heading">
                    <h3 className="card-title">Danh sách sản phẩm</h3>
                </div>
                <div className="card-body">
                    <table className="table table-bodered table-hover">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Mã</th>
                                <th>Tên</th>
                                <th>Giá</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.children}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
} export default ProductList;

