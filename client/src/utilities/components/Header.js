import React from "react";
import { Box, Flex, Button, Text, Icon } from "rimble-ui";
// import NetworkIndicator from "@rimble/network-indicator"
import AccountOverview from "./AccountOverview";
import AccountModal from "./AccountModal";

class Header extends React.Component {
  state = {
    isOpen: false
  }

  toggleModal = () => {
    this.setState(state => ({...state, isOpen: !state.isOpen}));
  }

  render() {
              // {!this.props.isMobile &&
                // <Box mr={[2, 4]}>
                //   <NetworkIndicator
                //     currentNetwork={this.props.network.current.id}
                //     requiredNetwork={this.props.network.required.id} />
                // </Box>
              // }
    return (
      <Box style={{
        'position': 'absolute',
        'left': '0',
        'right': '0',
        }}
      >
        <Flex alignItems={"center"} bg={"transparent"} py={1}>
          <Box ml={[3, 4]} width={[4/12]} alignItems={"center"}>
            <Flex alignItems={"center"}>
              <Icon name="Train" size={35} color="primary" />
              <Text fontSize={3}>
                Idle
              </Text>
            </Flex>
          </Box>
          <Box width={[8/12]} justifyContent="flex-end">
            <Flex alignItems={"center"} justifyContent="flex-end">
              {this.props.account ? (
                <AccountOverview
                  account={this.props.account}
                  hasQRCode={false}
                  isMobile={this.props.isMobile}
                  accountBalanceLow={this.props.accountBalanceLow}
                  accountBalance={this.props.accountBalance}
                  accountBalanceDAI={this.props.accountBalanceDAI}
                  toggleModal={this.toggleModal}
                />
              ) : (
                <Button
                  borderRadius={4}
                  my={2}
                  mr={[3, 4]}
                  onClick={this.props.connectAndValidateAccount}
                  size={this.props.isMobile ? 'small' : 'medium'}
                >
                  Connect
                </Button>
              )}
            </Flex>
          </Box>
        </Flex>
        <AccountModal
          account={this.props.account}
          accountBalance={this.props.accountBalance}
          accountBalanceDAI={this.props.accountBalanceDAI}
          isOpen={this.state.isOpen}
          isMobile={this.props.isMobile}
          closeModal={this.toggleModal}
          network={this.props.network.current} />
      </Box>
    );
  }
}

export default Header;