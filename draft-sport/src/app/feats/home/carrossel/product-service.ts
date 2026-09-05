import { Service, signal } from '@angular/core';
import { Product } from './product';

@Service()
export class ProductService {

    readonly products = signal<Product[]>([

        { 
            id: 1, 
            name: 'Produto 1', 
            price: 99.90, 
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHV0b3N8ZW58MHx8MHx8fDA%3D'
        },
        { 
            id: 2, 
            name: 'Produto 2', 
            price: 149.90, 
            image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1dG9zfGVufDB8fDB8fHww' 
        },
        { 
            id: 3, 
            name: 'Produto 3', 
            price: 199.90, 
            image: 'https://plus.unsplash.com/premium_photo-1719289799376-d3de0ca4ddbc?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHByb2R1dG9zfGVufDB8fDB8fHww' 
        },
        { 
            id: 4,
            name: 'Produto 4', 
            price: 299.90, 
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZHV0b3N8ZW58MHx8MHx8fDA%3D' 
        },
        { 
            id: 5,
            name: 'Produto 5', 
            price: 299.90, 
            image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZHV0b3N8ZW58MHx8MHx8fDA%3D' 
        },
        { 
            id: 6,
            name: 'Produto 6', 
            price: 299.90, 
            image: 'https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHByb2R1dG9zfGVufDB8fDB8fHww' 
        },
        { 
            id: 7,
            name: 'Produto 7', 
            price: 299.90, 
            image: 'https://images.unsplash.com/photo-1611930021592-a8cfd5319ceb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHByb2R1dG9zfGVufDB8fDB8fHww' 
        }

    ])

}
