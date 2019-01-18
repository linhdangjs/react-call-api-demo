import React, { Component } from 'react';
import ProductList from './../../components/ProductList/ProductList';
import ProductItem from './../../components/ProductItem/ProductItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actFetchProductsRequest, actDeleteProductsRequest } from './../../actions/index';


class ProductListPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    // đc gọi khi render lần đầu tiên
    componentDidMount() {
        var { fetchAllProducts } = this.props;
        //xử lý gọi lên api để lấy data từ server
        fetchAllProducts();
        
    }

    onDelete = (id) => {
        var { onDeleteProduct } = this.props;
        // middlewawre - redux thunk
        onDeleteProduct(id);

    }

   

    render() {
        var { products } = this.props;

        return (
            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <Link className="btn btn-info mt-10 mb-10" to="/product/add">Thêm Sản Phẩm</Link>
                <ProductList>
                    {this.showProducts(products)}
                </ProductList>
            </div>
        );
    }

    showProducts(products) {
        var result = null;
        if (products.length > 0) {
            result = products.map((product, index) => {
                return (
                    <ProductItem
                        key={index}
                        product={product}
                        index={index}
                        onDelete={this.onDelete}
                    />
                );
            });
        } else {
            return null;
        }
        return result;
    }

}

const mapStateToProps = state => {
    return {
        products: state.products
    }
}

const mapDispatchtoProps = (dispatch, props) => {
    return {
        fetchAllProducts: () => {
            dispatch(actFetchProductsRequest());
        },
        onDeleteProduct: (id) => {
            dispatch(actDeleteProductsRequest(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(ProductListPage);

