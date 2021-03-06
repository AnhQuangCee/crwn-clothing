import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { ReactComponent as Logo } from '../../assets/crown.svg'
import { auth } from '../../firebase/firebase.utils'
import { selectCartHidden } from '../../redux/cart/cart.selectors'
import { selectorCurrentUser } from '../../redux/user/user.selectors'
import Cart from '../cart-dropdown/cartDropdown.component'
import CartIcon from '../cart-icon/cartIcon.component'
import {
	HeaderContainer,
	LogoContainer,
	OptionLink,
	OptionsContainer,
} from './header.styles'
import './header.styles.scss'

const Header = ({ currentUser, hidden }) => (
	<HeaderContainer className='header'>
		<LogoContainer to='/'>
			<Logo className='logo' />
		</LogoContainer>
		<OptionsContainer>
			<OptionLink to='./shop'>SHOP</OptionLink>
			<OptionLink to='./contact'>CONTACT</OptionLink>
			{currentUser ? (
				<OptionLink as='div' onClick={() => auth.signOut()}>
					SIGN OUT
				</OptionLink>
			) : (
				<OptionLink to='./signIn'>SIGN IN</OptionLink>
			)}
			<CartIcon />
		</OptionsContainer>
		{hidden ? null : <Cart />}
	</HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
	currentUser: selectorCurrentUser,
	hidden: selectCartHidden,
})

export default connect(mapStateToProps)(Header)
