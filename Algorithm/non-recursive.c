#include <stdio.h>

/* Bubble Sort */
void sortArray(int A[], int N)
{
    int i, j, temp;

    for(i = 0; i < N - 1; i++)
    {
        for(j = 0; j < N - i - 1; j++)
        {
            if(A[j] > A[j + 1])
            {
                temp = A[j];
                A[j] = A[j + 1];
                A[j + 1] = temp;
            }
        }
    }
}

/* Triangle Check */
int triangleNonRecursive(int A[], int N)
{
    int i;

    /* Sort the array */
    sortArray(A, N);

    /* Check triangle condition */
    for(i = 0; i < N - 2; i++)
    {
        if(A[i] + A[i + 1] > A[i + 2])
        {
            return 1;
        }
    }

    return 0;
}

int main_9()
{
    int N;
    int i;

    printf("Non-Recursive Algorithm to Check is there a Triangle \n");
    printf("\nEnter number of Inputs: ");
    scanf("%d", &N);

    int A[N];

    /* Input array elements */
    for(i = 0; i < N; i++)
    {
        printf("Enter side %d: ", i + 1);
        scanf("%d", &A[i]);
    }

    int result;

    result = triangleNonRecursive(A, N);

    if(result == 1)
    {
        printf("\n  {1}  Triangle exists\n");
    }
    else
    {
        printf("\n  {0}  Triangle does not exist\n");
    }

    return 0;
}
