
from scripts.utils import get_account
from brownie import PixelLegionMarket

def deploy_contract(get_last_deployment, publish_source):
    if get_last_deployment == True:
        print(PixelLegionMarket[-1])
        return PixelLegionMarket[-1]

    pixel_legion_market = PixelLegionMarket.deploy({"from": get_account()}, publish_source=publish_source)
    return pixel_legion_market

def main():
    deploy_contract(get_last_deployment=False, publish_source=True)
