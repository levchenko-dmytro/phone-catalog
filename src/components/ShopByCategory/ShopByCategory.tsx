import { useContext } from 'react';
import './ShopByCategory.scss';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../GlobalContext';

export const ShopByCategory = () => {
  const { categoriesList } = useContext(GlobalContext);

  return (
    <>
      <h1 className="categories-title">Shop by category</h1>

      <ul data-cy="categoryLinksContainer" className="categories">
        {categoriesList.map(category => {
          const { title, name, img, qnt } = category;

          return (
            <li className="categories__item" key={title}>
              <Link to={`/${name}`} className="categories__link">
                <div className="categories__wrapper-img">
                  <img className="categories__img" src={img} alt="title" />
                </div>

                <h3 className="categories__title">{title}</h3>

                <p className="categories__text">{`${qnt} models`}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
