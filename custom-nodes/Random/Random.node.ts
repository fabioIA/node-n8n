import { INodeType, INodeTypeDescription, INodeExecutionData } from 'n8n-workflow'
import axios from 'axios'

export class Random implements INodeType 
{
    description: INodeTypeDescription = 
    {
        displayName: 'Random',
        name: 'random',
        icon: require('./icon.svg'),
        group: ['transform'],
        version: 1,
        description: 'True Random Number Generator',
        defaults: { name: 'Random' },
        inputs: ['main'],
        outputs: ['main'],
        properties: [
            {
                displayName: 'Min',
                name: 'min',
                type: 'number',
                default: 1,
                description: 'Número mínimo',
                required: true
            },
            {
                displayName: 'Max',
                name: 'max',
                type: 'number',
                default: 100,
                description: 'Número máximo',
                required: true
            }
        ]
    };

    async execute(): Promise<INodeExecutionData[][]> 
    {
        const min = (this as any).getNodeParameter('min', 0) as number
        const max = (this as any).getNodeParameter('max', 0) as number

        const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`
        const response = await axios.get(url)
        const result = parseInt(response.data as string)

        return [[{ json: { randomNumber: result } }]]
    }
}
