import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Material from '../../shared/material';
import { setActiveWallet } from '../../store/actions/actions';
import WalletForm from './walletForm/WalletForm';
import { LoadingContextProvider } from '../../context/LoadingContext';
import { WALLETS_TYPES } from '../../shared/constants';
import { formatCurrency } from '../../shared/utilities';

const useStyles = makeStyles((theme) => ({
  walletSidebar: {
    minWidth: '215px',
    height: `calc(100vh - ${theme.toolbarHeight.desktop}px)`,
    marginTop: `-${theme.spacing(3)}px`,
    marginLeft: `-${theme.spacing(3)}px`,
    marginRight: `${theme.spacing(3)}px`,
  },

  walletPaper: {
    width: '100%',
    height: '100%',
    boxShadow: theme.shadows[3],
  },

  wallets: {
    width: '100%',
    height: `calc(100vh - ${theme.toolbarHeight.desktop}px - 80px)`,
    maxHeight: `calc(100vh - ${theme.toolbarHeight.desktop}px - 80px)`,
    overflow: 'auto',
    ...theme.mixins.customScrollBar,
  },

  header: {
    height: '80px',
  },

  card: {
    position: 'relative',
    margin: '0',
    padding: `10px ${theme.spacing(1)}px`,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    transition: `background-color ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeIn}`,

    '&:focus': {
      outline: 'none',
    },

    '&:hover': {
      cursor: 'pointer',

      '& $cardContent__name': {
        color: theme.palette.primary.dark,
      },

      '& $cardContent__amount': {
        color: theme.palette.primary.dark,
      },

      '& $cardContent__divider': {
        backgroundColor: theme.palette.primary.dark,
        transform: 'translateX(0)',
      },
    },

    '&.active': {
      backgroundColor: theme.palette.primary.dark,

      '& $cardContent__name': {
        color: theme.palette.primary.contrastText,
      },

      '& $cardContent__amount': {
        color: theme.palette.primary.contrastText,
      },

      '& $cardContent__type': {
        color: theme.palette.primary.contrastText,
      },

      '& $cardContent__divider': {
        transform: 'translateX(0)',
        backgroundColor: theme.palette.primary.dark,
      },

      '&:hover': {

        '& $cardContent__name': {
          color: theme.palette.primary.contrastText,
        },

        '& $cardContent__amount': {
          color: theme.palette.primary.contrastText,
        },

        '& $cardContent__type': {
          color: theme.palette.primary.contrastText,
        },

        '& $cardContent__divider': {
          backgroundColor: theme.palette.primary.dark,
        },
      },
    },
  },

  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  cardContent__name: {
    fontSize: '16px',
    fontWeight: '400',
    color: theme.palette.text.muted,
    transition: `color ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeIn}`,
  },

  cardContent__amount: {
    fontSize: '19px',
    fontWeight: '700',
    color: theme.palette.text.muted,
    transition: `color ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeIn}`,
  },

  cardContent__type: {
    fontSize: '12px',
    fontWeight: '400',
    color: theme.palette.text.muted,
    transition: `color ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeIn}`,
  },

  cardContent__divider: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    height: '1px',
    width: '100%',
    backgroundColor: theme.palette.background.grey,
    transform: 'translateX(40%)',
    transition: `transform ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeIn}, background-color ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeIn}`,
  },
}));

const WalletSidebar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(state => state.user);
  const activeWallet = useSelector(state => state.user.activeWallet);

  return (
    <Material.Box display="flex" className={classes.walletSidebar}>
      <Material.Paper className={classes.walletPaper}>
        <Material.Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Material.Box
            className={classes.header}
            py={3}
          >
            <Material.Typography
              variant="h6"
            >
              Wallets
            </Material.Typography>
          </Material.Box>
          <Material.Box
            className={classes.wallets}
          >
            <Material.Box
              display="flex"
              flexDirection="column"
            >
              {
                user.wallets.map(wallet => (
                  <div
                    key={wallet.id}
                    className={[
                      classes.card,
                      wallet.id === activeWallet ? 'active' : '',
                    ].join(' ')}
                    onClick={() => dispatch(setActiveWallet(wallet.id))}
                    onKeyDown={() => dispatch(setActiveWallet(wallet.id))}
                    role="button"
                    tabIndex={0}
                  >
                    <div className={classes.cardContent}>
                      <div className={classes.cardContent__name}>
                        {wallet.name}
                      </div>
                      <div className={classes.cardContent__amount}>
                        {formatCurrency(wallet.balance, user.currency, user.locale)}
                      </div>
                    </div>
                    <div className={classes.cardContent}>
                      <div className={classes.cardContent__type}>
                        {WALLETS_TYPES[wallet.type].label}
                      </div>
                      {
                        wallet.id === activeWallet && (
                          <>
                            <LoadingContextProvider>
                              <WalletForm
                                editForm
                                id={wallet.id}
                                name={wallet.name}
                                balance={wallet.balance}
                                type={wallet.type}
                              />
                            </LoadingContextProvider>
                          </>
                        )
                      }
                    </div>
                    <div className={classes.cardContent__divider} />
                  </div>
                ))
              }
              <LoadingContextProvider>
                <WalletForm />
              </LoadingContextProvider>
            </Material.Box>
          </Material.Box>
        </Material.Box>
      </Material.Paper>
    </Material.Box>
  );
};

export default WalletSidebar;
