import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { actAddProductRequest, actGetProductRequest, actUpdateProductRequest } from './../../actions/index';
import { connect } from 'react-redux';

class ProductActionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtPrice: '',
            chkbStatus: false
        };
    }

    componentDidMount() {
        var { match, onEditProduct } = this.props;
        if (match) {
            var id = match.params.id;
            //mapDispatchToProps    
            onEditProduct(id);
        };

    }

    // khi dispatch -> nhận đc props 'itemEditing' -> set lại state để in dữ liệu ra from
    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditing) {
            var { itemEditing } = nextProps;
            this.setState({
                id: itemEditing.id,
                txtName: itemEditing.name,
                txtPrice: itemEditing.price,
                chkbStatus: itemEditing.status
            })
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });
    }

    onSave = (e) => {
        e.preventDefault();

        var { id, txtName, txtPrice, chkbStatus } = this.state;
        var { history, onUpdateProduct, onAddProduct } = this.props;
        var product = {
            id: id,
            name: txtName,
            price: txtPrice,
            status: chkbStatus
        };
        if (id) { // update 
            // mapDispatchToProps
            onUpdateProduct(product);
        } else {

            // mapDispatchToProps 
            onAddProduct(product);

        }
        // history là props truyền từ 'route config'
        history.goBack();
    }

    render() {
        var { txtName, txtPrice, chkbStatus } = this.state;
        return (
            <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                <form onSubmit={this.onSave}>
                    <div className="form-group">
                        <label>Tên Sản Phẩm : </label>
                        <input
                            type="text"
                            className="form-control"
                            name='txtName'
                            value={txtName}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Giá : </label>
                        <input
                            type="number"
                            className="form-control"
                            name='txtPrice'
                            value={txtPrice}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Trạng Thái : </label>
                        <div className="checkbox">
                            <label>
                                <input
                                    type="checkbox"
                                    name='chkbStatus'
                                    value={chkbStatus}
                                    onChange={this.onChange}
                                    checked={chkbStatus}
                                />
                                Còn Hàng
                        </label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary mr-10">Lưu lại</button>
                    <Link to='/product-list' className="btn btn-danger">Trở lại</Link>
                </form>
            </div>
        );
    }


}

const mapStateToProps = state => {
    return {
        itemEditing: state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddProduct: (product) => {
            dispatch(actAddProductRequest(product))
        },
        onEditProduct: id => {
            dispatch(actGetProductRequest(id))
        },
        onUpdateProduct: product => {
            dispatch(actUpdateProductRequest(product))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);

