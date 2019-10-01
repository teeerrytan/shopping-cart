import React, { Component } from 'react';
import './App.scss';
import ProductTable from './components/ProductTable';
import FloatCart from './components/FloatCart';
import Size from './components/Size';
import firebase from 'firebase';
import styles from './firebase.css';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const config = {
	apiKey: 'AIzaSyBjlc_JdOm6LXMO5qNxtk1OUo_BSy6R8BY',
	authDomain: 'new-shopping-cart.firebaseapp.com',
	databaseURL: 'https://new-shopping-cart.firebaseio.com',
	projectId: 'new-shopping-cart',
	storageBucket: 'new-shopping-cart.appspot.com',
	messagingSenderId: '975935197091'
};
const firebaseApp = firebase.initializeApp(config);
var db = firebase.firestore();
var userRef = db.collection('users');

export default class App extends Component {
	constructor(props) {
		super(props);
		this.db = firebaseApp.firestore();
		this.state = {
			productQuantity: 0,
			cartProducts: [],
			totalPrice: 0,
			cartIsOpen: false,
			sizes: new Set(),
			isSignedIn: false,
			itemNumbers: {},
			UID: ''
		};
		this.handleAdd = this.handleAdd.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
	}

	async componentDidMount() {
		var items = await this.getItemNumber();

		var itemMap = await new Map(Object.entries(items));
		console.log('itemMap is: ' + itemMap.get('10412368723880252'));
		this.setState({
			itemNumbers: itemMap
		});

		await firebase.auth().onAuthStateChanged(user => {
			if (user) {
				console.log('User UID is: ' + user.uid);
				this.setState({
					UID: user.uid,
					isSignedIn: true
				});
				var docRef = userRef.doc(user.uid);
				let cartDB = [];
				let tp = 0;
				let quantity = 0;
				try {
					docRef.get().then(async userDoc => {
						console.log('userDOC is: ' + userDoc);
						if (userDoc.exists) {
							cartDB = Object.values(userDoc.data().items);
							tp = Number(userDoc.data().totalPrice);
							quantity = userDoc.data().quantity;
							await this.setState({
								cartProducts: cartDB,
								totalPrice: tp,
								productQuantity: quantity
							});
						} else {
							console.log('testtest');
							if (this.state.cartProducts !== []) {
								db.collection('users')
									.doc(user.uid)
									.set({
										items: this.state.cartProducts,
										totalPrice: Number(
											this.state.totalPrice
										),
										quantity: this.state.productQuantity
									});
							}
						}
					});
				} catch (e) {
					console.log(e);
				}
			}
		});
	}

	handleCheckout = async (total, map) => {
		if (total <= 0) {
			alert('Please buy some stuff. We are poor.');
		} else {
			await db
				.collection('users')
				.doc(this.state.UID)
				.set({
					items: [],
					totalPrice: 0,
					quantity: 0
				});
			alert('Your total price is: $ ' + total + '. Thank you so much!');
			await this.setState({
				productQuantity: 0,
				cartProducts: [],
				totalPrice: 0
			});
		}
		await this.updateAvail(map);
	};

	uiConfig = {
		signInFlow: 'popup',
		signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
		callbacks: {
			signInSuccessWithAuthResult: () => false
		}
	};

	getItemNumber = async () => {
		var availRef = this.db.collection('items').doc('availability');
		try {
			const items = await availRef.get();
			return items.data();
		} catch (e) {
			console.log('The error is', e);
			return 0;
		}
	};

	updateAvail = async map => {
		await map.forEach(this.updateDB);
	};

	updateDB = async (value, key, map) => {
		var availRef = await this.db.collection('items').doc('availability');
		let tempKey = key;
		var setWithMerge = availRef.set(
			{
				[tempKey]: value
			},
			{ merge: true }
		);
	};

	async handleAdd(product) {
		console.log('type of product: ' + typeof product);
		await console.log('prev is: ' + this.state.cartProducts);
		await this.setState(prevState => {
			return {
				productQuantity: prevState.productQuantity + 1,
				cartProducts: prevState.cartProducts.concat(product),
				totalPrice: prevState.totalPrice + product.price
			};
		});
		let tempPrice = await Number(this.state.totalPrice);
		if (this.state.UID === '') {
			alert('Please sign in firstly');
		} else {
			await db
				.collection('users')
				.doc(this.state.UID)
				.set({
					items: this.state.cartProducts,
					totalPrice: tempPrice.toFixed(2),
					quantity: this.state.productQuantity
				});
			this.setState({ cartIsOpen: true });
		}
	}

	handleToggle() {
		this.setState({
			cartIsOpen: !this.state.cartIsOpen
		});
	}

	async updateItem(sku) {
		console.log('before ' + this.state.itemNumbers.get(sku));

		let tempMap = this.state.itemNumbers;
		await tempMap.set(sku, tempMap.get(sku) - 1);
		await this.setState({
			itemNumbers: tempMap
		});
		console.log('after ' + this.state.itemNumbers.get(sku));
	}

	handleSignOut = async () => {
		await this.setState({
			UID: '',
			isSignedIn: false
		});
		await firebaseApp.auth().signOut();
	};

	removeProduct = async product => {
		console.log('sku is: ' + product.sku);
		await this.updateItem(product.sku);
		await this.setState(prevState => {
			const { cartProducts } = prevState;
			return {
				productQuantity: prevState.productQuantity - 1,
				cartProducts: cartProducts.filter(p => p.sku !== product.sku),
				totalPrice: prevState.totalPrice - product.price
			};
		});
		let tempPrice = await Number(this.state.totalPrice);
		tempPrice = await tempPrice.toFixed(2);
		await db
			.collection('users')
			.doc(this.state.UID)
			.set({
				items: this.state.cartProducts,
				totalPrice: tempPrice,
				quantity: this.state.productQuantity
			});
	};

	handleToggleFilterSize(size) {
		var filterSizes = this.state.sizes;
		if (filterSizes.has(size)) {
			filterSizes.delete(size);
		} else {
			filterSizes.add(size);
		}
		this.setState({
			sizes: filterSizes
		});
		return;
	}

	render() {
		let PRODUCTS = require('./data/products.json');
		return (
			<div>
				<nav>
					<div className="nav-wrapper">
						<div
							className="left hide-on-med-and-down"
							style={{ height: '60px' }}
						>
							{this.state.isSignedIn !== undefined &&
								!this.state.isSignedIn && (
									<div>
										<StyledFirebaseAuth
											className={styles.firebaseUi}
											uiConfig={this.uiConfig}
											firebaseAuth={firebaseApp.auth()}
										/>
									</div>
								)}
							{this.state.isSignedIn && (
								<div className={styles.signedIn}>
									&nbsp;&nbsp;&nbsp;Hello{' '}
									{firebaseApp.auth().currentUser.displayName}
									. You are now signed In! &nbsp;&nbsp;&nbsp;
									<button
										className={styles.button}
										onClick={this.handleSignOut}
									>
										Sign out
									</button>
								</div>
							)}
						</div>
						<a href="#!" className="brand-logo center">
							SHAKALAKA
						</a>
					</div>
				</nav>

				<div className="page">
					<Size
						className="Size"
						sizes={this.state.sizes}
						handleToggleFilterSize={size =>
							this.handleToggleFilterSize(size)
						}
					/>
					<ProductTable
						className="products"
						sizes={this.state.sizes}
						products={PRODUCTS}
						handleAdd={this.handleAdd}
						getItemNumber={this.getItemNumber}
						itemNumbers={this.state.itemNumbers}
					/>
					<FloatCart
						className="cart"
						cartTotal={{
							productQuantity: this.state.productQuantity,
							totalPrice: this.state.totalPrice
						}}
						cartProducts={this.state.cartProducts}
						isOpen={this.state.cartIsOpen}
						handleToggle={this.handleToggle}
						removeProduct={this.removeProduct}
						getItemNumber={this.getItemNumber}
						handleCheckout={this.handleCheckout}
						updateAvail={this.updateAvail}
					/>
				</div>
			</div>
		);
	}
}
