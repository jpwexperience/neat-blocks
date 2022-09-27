/**
 * Markup for search pagination.
 * Pages start at 1.
 * 
 * @param {int} total 
 * @returns 
 */
export function getPagination( total ) {
    let page            = 1;
    let paginationTotal = 5;
    let postsPerPage    = 16;
    const numPages      = Math.ceil( total / postsPerPage);
    const offset        = Math.floor( paginationTotal / 2 );
    let firstItem       = page - offset;
    let lastItem        = Math.min(page + offset, numPages);
    
    // Start of list
    if( firstItem <= 0 ) {
        firstItem       = 1;
        lastItem        = Math.min(paginationTotal, numPages);
    // Last of list
    } else if( lastItem === numPages ) {
        firstItem       = Math.max(numPages - paginationTotal + 1, 0);
        lastItem        = numPages; 
    }
    
    return (<>
        <div className='product-search__pagination'>
            <div className="product-search__pagination__link first" onClick={() => {setQuery(searchQuery, 1)}}>{'<<'}</div>
            <div className="product-search__pagination__link previous" onClick={() => {setQuery(searchQuery, page - 1 < 1 ? 1 : page - 1)}}>{'<'}</div>
            {[...Array(numPages)].map((e, i) => {
                let index       = i + 1;
                let isPage      = index == page ? 'is-page' : '';
                if( index < firstItem || index > lastItem ) return;
                return(<>
                    <div className={`product-search__pagination__link ${isPage}`} onClick={() => {setQuery(searchQuery, index)}}>[{index}]</div>
                </>);
            })}
            <div className="product-search__pagination__link next" onClick={() => {setQuery(searchQuery, page + 1 > numPages ? numPages : page + 1)}}>{'>'}</div>
            <div className="product-search__pagination__link last" onClick={() => {setQuery(searchQuery, numPages)}}>{'>>'}</div>
        </div>
    </>);
}