#include <stdio.h>


void merge(int A[], int left, int mid, int right)
{
    int i, j, k;

    int n1 = mid - left + 1;
    int n2 = right - mid;

    int L[n1], R[n2];

    for(i = 0; i < n1; i++)
        L[i] = A[left + i];

    for(j = 0; j < n2; j++)
        R[j] = A[mid + 1 + j];

    i = 0;
    j = 0;
    k = left;

    while(i < n1 && j < n2)
    {
        if(L[i] <= R[j])
        {
            A[k] = L[i];
            i++;
        }
        else
        {
            A[k] = R[j];
            j++;
        }

        k++;
    }

    while(i < n1)
    {
        A[k] = L[i];
        i++;
        k++;
    }

    while(j < n2)
    {
        A[k] = R[j];
        j++;
        k++;
    }
}


void mergeSort(int A[], int left, int right)
{
    if(left < right)
    {
        int mid = (left + right) / 2;

        mergeSort(A, left, mid);
        mergeSort(A, mid + 1, right);

        merge(A, left, mid, right);
    }
}

/* Triangle Check */
int checkTriangle(int A[], int N, int i)
{
    if(i >= N - 2)
    {
        return 0;
    }

    if(A[i] + A[i + 1] > A[i + 2])
    {
        return 1;
    }

    return checkTriangle(A, N, i + 1);
}


int triangleRecursive(int A[], int N)
{
    mergeSort(A, 0, N - 1);

    return checkTriangle(A, N, 0);
}

int main()
{
    int N;
    int i;

    printf("Recursive Triangle Algorithm\n");

    printf("\nEnter number of inputs: ");
    scanf("%d", &N);

    int A[N];

    for(i = 0; i < N; i++)
    {
        printf("Enter side %d: ", i + 1);
        scanf("%d", &A[i]);
    }

    int result = triangleRecursive(A, N);

    if(result == 1)
    {
        printf("\n(1) Triangle exists\n");
    }
    else
    {
        printf("\n(0) Triangle does not exist\n");
    }

    return 0;
}
