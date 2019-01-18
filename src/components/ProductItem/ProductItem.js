import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductItem extends Component {

    onDelete = id => {
        var { onDelete } = this.props;
        if (confirm('Bạn chắc chắn muốn xóa sản phẩm này không?')) { //eslint-disable-line
            onDelete(id);
        }
    };

    render() {
        var { product, index } = this.props;
        var statusName = product.status ? 'Còn Hàng' : 'Hết Hàng';
        var statusClass = product.status ? 'warning' : 'danger';
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                    <span className={`badge badge-${statusClass}`}>{statusName}</span>
                </td>
                <td>
                    <Link 
                        to={`/product/${product.id}/edit`} 
                        className="btn btn-success mr-10"
                    >
                        Sửa
                    </Link>
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={() => this.onDelete(product.id)}
                    >
                        Xóa
                    </button>
                </td>

            </tr>
        );
    }
} export default ProductItem;

