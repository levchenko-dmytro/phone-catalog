import React, { useCallback, useContext, useEffect, useState } from 'react';
import './ProductDetailsPage.scss';
import classNames from 'classnames';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getProductsDeatailsList } from '../../api/products';
import { ProductDetails } from '../../types/ProductDetails';
import { Buttons } from '../Buttons';
import { ProductPictures } from '../ProductPictures';
import { GlobalContext } from '../../GlobalContext';
import { getLink } from '../../services/getLink';
import { AvailableColors } from '../AvailableColors';
import { AboutProduct } from '../AboutProduct';
import { TechSpecs } from '../TechSpecs/TechSpecs';
import { ProductsSlider } from '../ProductsSlider';
import { Loader } from '../Loader';
import { ButtonBack } from '../ButtonBack';

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const { productsList, isLoading, setIsLoading } = useContext(GlobalContext);
  const [errorMsg, setErrorMsg] = useState('');

  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null,
  );
  const { pathname } = useLocation();
  const category = pathname.slice(1).split('/')[0];

  const loadProducts = useCallback(async () => {
    try {
      const productsDeatailsList = await getProductsDeatailsList(category);

      const product = productsDeatailsList.find(item => item.id === productId);

      if (product) {
        setProductDetails(product);
      }
    } catch (error) {
      setErrorMsg('Phone was not found');
    }

    setIsLoading(false);
  }, [category, productId, setIsLoading]);

  useEffect(() => {
    if (!productId) {
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    loadProducts();
  }, [loadProducts, productId, setIsLoading]);

  const getItemId = () => {
    let prodId = '000000';

    if (productDetails) {
      prodId =
        productsList.find(item => item.itemId === productDetails.id)?.id ||
        '000000';
    }

    const length = 6 - String(prodId).length;

    if (length > 0) {
      for (let i = 0; i < length; i++) {
        prodId = '0' + prodId;
      }
    }

    return prodId;
  };

  const mayAlsoLikeList = productsList.filter(item =>
    productDetails ? item.itemId.includes(productDetails.namespaceId) : [],
  );

  return (
    <>
      {isLoading && <Loader />}

      {!isLoading && errorMsg && (
        <h1
          className="
            ProductDetailsPage__title
            ProductDetailsPage__title--error
          "
        >
          {errorMsg}
        </h1>
      )}

      {!isLoading && productDetails && !errorMsg && (
        <>
          <div className="ProductDetailsPage">
            <ButtonBack />

            <h1 className="ProductDetailsPage__title">{productDetails.name}</h1>

            <ProductPictures pictures={productDetails.images} />

            <div className="ProductDetailsPage__top-center">
              <div className="ProductDetailsPage__top-center-wrapper">
                <div className="ProductDetailsPage__top-center-content">
                  <div className="ProductDetailsPage__available-colors-title">
                    <p className="ProductDetailsPage__small-text">
                      Available colors
                    </p>

                    <p className="ProductDetailsPage__id-name-in-colors">
                      {`ID: ${getItemId()}`}
                    </p>
                  </div>

                  <AvailableColors
                    colorsAvailable={productDetails.colorsAvailable}
                    currentColor={productDetails.color}
                    linkPart={productDetails.namespaceId}
                    capacity={productDetails.capacity}
                  />
                </div>

                <div className="ProductDetailsPage__deviding-line" />

                <div className="ProductDetailsPage__top-center-content">
                  <p className="ProductDetailsPage__small-text">
                    Select capacity
                  </p>

                  <ul
                    style={{
                      display: 'flex',
                      columnGap: '8px',
                    }}
                  >
                    {productDetails.capacityAvailable.map(cap => (
                      <li key={cap}>
                        <Link
                          to={`../${getLink(productDetails.namespaceId, cap, productDetails.color)}`}
                          className={classNames(
                            'ProductDetailsPage__link-capacity',
                            {
                              'ProductDetailsPage__link-capacity--active':
                                productDetails.capacity === cap,
                            },
                          )}
                        >
                          {`${cap.slice(0, -2)} ${cap.slice(-2)}`}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="ProductDetailsPage__deviding-line" />
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '16px',
                  marginBottom: '32px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    columnGap: '8px',
                    alignItems: 'center',
                  }}
                >
                  <h1 className="ProductDetailsPage__price">
                    {productDetails.priceDiscount}
                  </h1>
                  <h2
                    className="
                  ProductDetailsPage__price
                  ProductDetailsPage__price--full
                "
                  >
                    {productDetails.priceRegular}
                  </h2>
                </div>

                <Buttons id={productDetails.id} height="48px" width="48px" />
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '8px',
                }}
              >
                <div className="ProductDetailsPage__info">
                  <span className="ProductDetailsPage__info-name">Screen</span>
                  <span className="ProductDetailsPage__info-value">
                    {productDetails.screen}
                  </span>
                </div>
                <div className="ProductDetailsPage__info">
                  <span className="ProductDetailsPage__info-name">
                    Processor
                  </span>
                  <span className="ProductDetailsPage__info-value">
                    {productDetails.processor}
                  </span>
                </div>
                <div className="ProductDetailsPage__info">
                  <span className="ProductDetailsPage__info-name">
                    Resolution
                  </span>
                  <span className="ProductDetailsPage__info-value">
                    {productDetails.resolution}
                  </span>
                </div>
                <div className="ProductDetailsPage__info">
                  <span className="ProductDetailsPage__info-name">RAM</span>
                  <span className="ProductDetailsPage__info-value">
                    {productDetails.ram}
                  </span>
                </div>
              </div>
            </div>

            <div className="ProductDetailsPage__top-right">
              <span className="ProductDetailsPage__id-name">
                {`ID: ${getItemId()}`}
              </span>
            </div>

            <div className="deviding-block" />

            <div className="ProductDetailsPage__about">
              <h2 className="ProductDetailsPage__subtitle">About</h2>

              <div className="ProductDetailsPage__deviding-line" />

              <AboutProduct description={productDetails.description} />
            </div>

            <div className="deviding-block deviding-block--onDesktop" />

            <div className="ProductDetailsPage__tech-specs">
              <h2 className="ProductDetailsPage__subtitle">Tech specs</h2>

              <div className="ProductDetailsPage__deviding-line" />

              <TechSpecs
                screen={productDetails.screen}
                resolution={productDetails.resolution}
                processor={productDetails.processor}
                ram={productDetails.ram}
                camera={productDetails.camera}
                zoom={productDetails.zoom}
                cell={productDetails.cell}
              />
            </div>
          </div>

          <ProductsSlider
            products={mayAlsoLikeList}
            title="You may also like"
          />
        </>
      )}
    </>
  );
};
