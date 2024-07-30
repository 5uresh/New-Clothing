import SHOP_DATA from '../../shop-data'



import { useContext,Fragment } from 'react'
import { CategoriesContext } from '../../Contexts/categories.context'
import ProductCard from '../../Components/Product-card/product-card.component'
import CategoryPreview from '../../Components/Category-preview/category-preview'


const CategoriesPreview = () =>{
    const {categoriesMap} = useContext(CategoriesContext)


    return(
        <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>  
    )
}

export default CategoriesPreview