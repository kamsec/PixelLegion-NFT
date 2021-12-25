
from brownie import PixelLegionMarket

# there was some bug during publishing source so repeated the process with this code
def main():
    pixel_legion_market = PixelLegionMarket[-1]
    PixelLegionMarket.publish_source(pixel_legion_market)
